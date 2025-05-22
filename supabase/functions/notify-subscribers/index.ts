import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'npm:@supabase/supabase-js@2.39.7'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    // Get all subscribers
    const { data: subscribers, error: subscribersError } = await supabaseClient
      .from('newsletter_subscribers')
      .select('email')

    if (subscribersError) {
      throw new Error(`Failed to fetch subscribers: ${subscribersError.message}`)
    }

    if (!subscribers?.length) {
      return new Response(
        JSON.stringify({ message: 'No subscribers found' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      )
    }

    // Get latest airdrop
    const { data: latestAirdrop, error: airdropError } = await supabaseClient
      .from('airdrops')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (airdropError) {
      throw new Error(`Failed to fetch latest airdrop: ${airdropError.message}`)
    }

    if (!latestAirdrop) {
      return new Response(
        JSON.stringify({ message: 'No airdrops found' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      )
    }

    // Send email to each subscriber
    // Note: In production, you'd want to use a proper email service
    const emailPromises = subscribers.map(async (subscriber) => {
      try {
        // Implement your email sending logic here
        console.log(`Sending email to ${subscriber.email} about ${latestAirdrop.title}`)
      } catch (error) {
        console.error(`Failed to send email to ${subscriber.email}:`, error)
      }
    })

    await Promise.allSettled(emailPromises)

    return new Response(
      JSON.stringify({ message: 'Notifications sent successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error in notify-subscribers function:', error)
    
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})