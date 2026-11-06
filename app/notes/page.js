"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "../../lib/supabase/client";

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("Loading...");
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  async function loadNotes() {
    const { data: { user: currentUser }, error: authError } =
      await supabase.auth.getUser();

    if (authError || !currentUser) {
      setUser(null);
      setNotes([]);
      setMessage("Please log in to view your notes.");
      setLoading(false);
      return;
    }

    setUser(currentUser);

    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setMessage(error.message);
    } else {
      setNotes(data || []);
      setMessage("");
    }

    setLoading(false);
  }

  useEffect(() => {
    loadNotes();
  }, []);

  async function addNote(event) {
    event.preventDefault();

    if (!title.trim() || !user) return;

    const { error } = await supabase.from("notes").insert({
      title: title.trim(),
      user_id: user.id,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    setTitle("");
    setMessage("Note added successfully.");
    await loadNotes();
  }

  async function toggleNote(note) {
    const updatedTitle = note.title.startsWith("[Done] ")
      ? note.title.replace("[Done] ", "")
      : `[Done] ${note.title}`;

    const { error } = await supabase
      .from("notes")
      .update({ title: updatedTitle })
      .eq("id", note.id);

    if (error) {
      setMessage(error.message);
    } else {
      await loadNotes();
    }
  }

  async function deleteNote(id) {
    const { error } = await supabase
      .from("notes")
      .delete()
      .eq("id", id);

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Note deleted successfully.");
      await loadNotes();
    }
  }

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  return (
    <main style={{ maxWidth: "700px", margin: "40px auto", padding: "24px", fontFamily: "Arial, sans-serif" }}>
      <h1>LightPay Notes</h1>
      <p>Manage your notes using the Supabase database.</p>

      {user ? (
        <>
          <p>Signed in as: {user.email}</p>
          <button onClick={logout}>Log out</button>

          <form onSubmit={addNote} style={{ display: "flex", gap: "8px", margin: "24px 0" }}>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Enter a note"
              required
              style={{ flex: 1, minWidth: 0, padding: "12px" }}
            />
            <button type="submit">Add note</button>
          </form>

          {notes.map((note) => (
            <div key={note.id} style={{ marginBottom: "16px" }}>
              <span>{note.title}</span>{" "}
              <button onClick={() => toggleNote(note)}>Toggle done</button>{" "}
              <button onClick={() => deleteNote(note.id)}>Delete</button>
            </div>
          ))}
        </>
      ) : (
        <p><Link href="/login">Log in</Link> to use your notes.</p>
      )}

      {message && <p role="status">{message}</p>}
    </main>
  );
}
