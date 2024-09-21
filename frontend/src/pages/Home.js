import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note"
import "../styles/home.css"

function Home() {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
        api
            .get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);
            })
            .catch((error) => {
                alert(error);
            });
    };

    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 200) {
                    alert("Note was deleted");
                } else {
                    alert("Failed to delete");
                }
                getNotes();
            })
            .catch((error) => {
                alert(error);
            });
    };
    const createNote = (e) => {
        e.preventDefault();
        api
            .post("/api/notes/", { content, title })
            .then((res) => {
                if (res.status === 201) {
                    console.log(res)
                    alert("Note created!");
                } else {
                    alert("Failed to create!");
                }
                getNotes();
            })
            .catch((error) => {
                alert(error);
            });
        setContent("")
        setTitle("")
    };

    return (
        <div>
            <div>
                <h2 style={{textAlign:"center"}}>Notes</h2>
                <div className="notes-container">
                    {notes.map((note)=>{
                        return <Note key={note.id} note={note} onDelete={deleteNote} />
                    })}
                </div>
            </div>
            <div>
                <form onSubmit={createNote}>
                    <h2>Create a note</h2>
                    <label htmlFor="title">Title:</label>
                    <br />
                    <input
                        name="title"
                        id="title"
                        type="text"
                        value={title}
                        required
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                    />
                    <br />
                    <label htmlFor="content" rows={4} >Content:</label>
                    <br />
                    <textarea
                        id="content"
                        name="content"
                        value={content}
                        onChange={(e) => {
                            setContent(e.target.value);
                        }}
                    ></textarea>
                    <br />
                    <input type="submit" value="submit" />
                </form>
            </div>
        </div>
    );
}

export default Home;
