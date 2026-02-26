import { getYouTubeEmbedUrl } from '@/lib/youtube';
import styles from './YouTubeEmbed.module.css';

export default function YouTubeEmbed({ videoId, title }) {
    const embedUrl = getYouTubeEmbedUrl(videoId);

    if (!videoId) return null;

    return (
        <div className={styles.wrapper}>
            <iframe
                src={embedUrl}
                title={title || 'YouTube動画'}
                className={styles.iframe}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
            />
        </div>
    );
}
