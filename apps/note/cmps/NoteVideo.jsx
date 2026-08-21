export function NoteVideo({ info }) {

    function getYoutubeEmbedUrl(url) {
        let videoId

        if (url.includes('youtu.be/')) {
            videoId = url.split('youtu.be/')[1].split('?')[0]
        } else if (url.includes('v=')) {
            videoId = url.split('v=')[1].split('&')[0]
        }

        if (!videoId) return ''

        return `https://www.youtube.com/embed/${videoId}`
    }

    const embedUrl = getYoutubeEmbedUrl(info.url)

    if (!embedUrl) return null

    return <div className="note-video">
        <iframe
            src={embedUrl}
            title="YouTube video"
            allowFullScreen
        ></iframe>
    </div>
}