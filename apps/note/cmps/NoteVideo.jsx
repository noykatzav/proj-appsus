import { noteService } from '../services/note.service.js'

export function NoteVideo({ info }) {

    const embedUrl =  noteService.getYoutubeEmbedUrl(info.url)

    if (!embedUrl) return null

    return <div className="note-video">
        <iframe
            src={embedUrl}
            title="YouTube video"
            allowFullScreen
        ></iframe>

        {info.txt &&
            <p>{info.txt}</p>
        }
    </div>
}