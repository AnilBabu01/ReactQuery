import React, { useState } from "react";
import styles from "./AddNote.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { backendApiUrl } from "../Config/Config";

const Add = (note) => {
  return () =>
    fetch(`${backendApiUrl}note`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ note: note }),
    });
};

const AddNote = () => {
  const queryClient = useQueryClient();
  const [note, setnote] = useState("");

  const addNoteMutation = useMutation(Add(note), {
    onSuccess: () => {
      console.log("Success");
      queryClient.invalidateQueries(["notes"]);
      setnote("");
    },
    onError: (error) => {
      console.log("Error");
    },
  });

  return (
    <>
      <div className={styles.maindiv}>
        <div>
          <p>Add Your Note</p>
          <div className={styles.formdiv}>
            <label>Note</label>
            <textarea
              placeholder="Enter Your Note"
              value={note}
              onChange={(e) => setnote(e.target.value)}
            />
            <button onClick={(e) => addNoteMutation.mutate()}>Add Note</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNote;
