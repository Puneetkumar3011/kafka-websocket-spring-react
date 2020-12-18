import React from "react";
import _ from "lodash/fp";
import { useForm } from "react-hook-form";

export default function Admin() {
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = data => {
        // alert(JSON.stringify(data));
        if (data) {
            data.id = '';
            postNews(data).then((response) => {
                console.log(response);
                alert('News published!!')
            })
                .catch(e => {
                    console.log('Error in publishing:', e);
                    alert('News publishing failed!!')
                });
        }
    };

    const postNews = async (data) => {
        const url = 'http://localhost:7001/broadcastNewsAlert';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response.json();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>News Title</label>
            <input
                name="title"
                ref={register({
                    required: true
                })}
            />
            {_.get("title.type", errors) === "required" && (
                <p>This field is required</p>
            )}

            <label>News Type</label>
            <select name="newsType" ref={register}>
                <option value="NewsAlert">News Alert</option>
                <option value="BreakingNews">Breaking News</option>
            </select>

            <label>News Description</label>
            <input
                name="description"
                type="textArea"
                ref={register({
                    required: true
                })}
            />
            {_.get("description.type", errors) === "required" && (
                <p>This field is required</p>
            )}
            <input type="submit" />
        </form>
    );
}