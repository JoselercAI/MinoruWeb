export type YoutubeVideo = {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  publishedAt: string;
};

const fallbackVideos: YoutubeVideo[] = [
  {
    id: "iuYpytlutRA",
    title: "Me voy de Dubái",
    url: "https://www.youtube.com/watch?v=iuYpytlutRA",
    thumbnail: "https://i.ytimg.com/vi/iuYpytlutRA/hqdefault.jpg",
    publishedAt: "Último vídeo",
  },
  {
    id: "Y49liERqStY",
    title: "Desaparecí 9 meses y todo cambió",
    url: "https://www.youtube.com/watch?v=Y49liERqStY",
    thumbnail: "https://i.ytimg.com/vi/Y49liERqStY/hqdefault.jpg",
    publishedAt: "Vídeo reciente",
  },
  {
    id: "njZa4BecZAs",
    title: "Por este motivo dejo Amazon FBA (después de 5 años, se acabó)",
    url: "https://www.youtube.com/watch?v=njZa4BecZAs",
    thumbnail: "https://i.ytimg.com/vi/njZa4BecZAs/hqdefault.jpg",
    publishedAt: "Vídeo reciente",
  },
];

const pick = (text: string, tag: string) =>
  [...text.matchAll(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`, "g"))].map(
    (match) => match[1].replace(/<!\\[CDATA\\[|\\]\\]>/g, "").trim(),
  );

export async function getYoutubeVideos(limit = 3) {
  const channelId = process.env.YOUTUBE_CHANNEL_ID;

  if (!channelId || !channelId.startsWith("UC")) {
    return fallbackVideos.slice(0, limit);
  }

  try {
    const response = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
      { next: { revalidate: 3600 } },
    );

    if (!response.ok) {
      return fallbackVideos.slice(0, limit);
    }

    const xml = await response.text();
    const ids = pick(xml, "yt:videoId");
    const titles = pick(xml, "title").slice(1);
    const published = pick(xml, "published");

    return ids.slice(0, limit).map((id, index) => ({
      id,
      title: titles[index] || fallbackVideos[0].title,
      url: `https://www.youtube.com/watch?v=${id}`,
      thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      publishedAt: published[index]
        ? new Date(published[index]).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : fallbackVideos[0].publishedAt,
    }));
  } catch {
    return fallbackVideos.slice(0, limit);
  }
}
