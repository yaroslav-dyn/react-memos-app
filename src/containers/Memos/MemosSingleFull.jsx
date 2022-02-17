import React from 'react';
import {
    useParams
} from "react-router-dom";

const MemosSingleFull = () => {

    let { ids } = useParams();

    return (
        <div>
            this page id is {ids}

            {/* <div class="memo_preview">
                <div class="memo_preview__inner">
                    <div>
                        <label class="custom-label m_preview-label" for="memo-name"><b>Title:</b></label>
                        <input
                            id="memo-name"
                            type="text"
                            class="custom-input"
                            bind:value={note.name}
                        />
                    </div>

                    <div>
                        <label class="custom-label m_preview-label" for="memo-description"><b>Description:</b></label>
                        <textarea
                            class="custom-input area description_field"
                            rows="4"
                            id="memo-description"
                            name="description"
                            bind:value={note.description}
                        />
                    </div>

                    <div>
                        <div class="flex-grid adjust-center justify-s-side-in memo_status-box__time-edit">
                            <div class="memo_status-box">
                                <MemoStatusesView
                                    statusMemo="{note.status}"
                                    on:changeStatusInput={onChangeStatusMemo} />
                            </div>
                            <div class="flex-grid adjust-center">
                                <i class="material-icons">schedule</i>
                                {formatedDate}
                            </div>
                        </div>
                    </div>

                    <button class="action-btn warn w100" on:click={() => dispatch('closeView')}>
                        Close
                    </button>
                    <button class="action-btn success w100" on:click={updateNote}>
                        Update
                    </button>

                </div>
            </div> */}


        </div>
    )
}


export default MemosSingleFull