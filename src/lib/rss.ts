import { Feed } from 'feed';
import { supabase } from './supabase';

export async function generateRssFeed() {
  const feed = new Feed({
    title: 'Airdrops Hunter',
    description: 'Latest crypto airdrops and opportunities',
    id: 'https://airdrops-hunter.cloud/',
    link: 'https://airdrops-hunter.cloud/',
    language: 'en',
    image: 'https://airdrops-hunter.cloud/favicon.png',
    favicon: 'https://airdrops-hunter.cloud/favicon.png',
    copyright: `All rights reserved ${new Date().getFullYear()}, Airdrops Hunter`,
    updated: new Date(),
    generator: 'Airdrops Hunter RSS Feed',
    feedLinks: {
      rss2: 'https://airdrops-hunter.cloud/feed.xml',
    },
  });

  const { data: airdrops } = await supabase
    .from('airdrops')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(20);

  if (airdrops) {
    airdrops.forEach((airdrop) => {
      feed.addItem({
        title: airdrop.title,
        id: airdrop.id,
        link: `https://airdrops-hunter.cloud/airdrops/${airdrop.id}`,
        description: airdrop.short_description,
        content: airdrop.description,
        date: new Date(airdrop.created_at),
        image: airdrop.image_url,
      });
    });
  }

  return feed.rss2();
}