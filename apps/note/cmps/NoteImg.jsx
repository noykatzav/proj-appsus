export function NoteImg({ info }) {
    return <div className="note-img">
        <img src={info.url} alt="" />

        {info.txt &&
            <p>{info.txt}</p>
        }
    </div>
}