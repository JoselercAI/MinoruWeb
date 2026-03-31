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
    const response = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return fallbackVideos.slice(0, limit);
    }

    const xml = await response.text();
    const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map((match) => match[1]);

    return entries.slice(0, limit).map((entry, index) => {
      const id = pick(entry, "yt:videoId")[0] || fallbackVideos[index]?.id || fallbackVideos[0].id;
      const published = pick(entry, "published")[0];

      return {
        id,
        title: pick(entry, "title")[0] || fallbackVideos[index]?.title || fallbackVideos[0].title,
        url: `https://www.youtube.com/watch?v=${id}`,
        thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        publishedAt: published
          ? new Date(published).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : fallbackVideos[index]?.publishedAt || fallbackVideos[0].publishedAt,
      };
    });
  } catch {
    return fallbackVideos.slice(0, limit);
  }
}
