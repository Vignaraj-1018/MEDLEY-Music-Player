import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    prompt_string : '',
    isActive : false,
    triggered : false,
}

const promptSlice = createSlice({
    initialState,
    name: 'promptString',
    reducers: {
        setPromptString: (state, action) => {
            state.prompt_string = action.payload;
            state.isActive = true;
            if(action.payload == ''){
                state.isActive = false;
            }
        },
        clearPromptString: (state) => {
            state.prompt_string = '';
            state.isActive = false;
        },
        searchTrigger: (state, action) => {
            state.triggered = action.payload;
        }
    }
});

export const { setPromptString, clearPromptString, searchTrigger } = promptSlice.actions;

export default promptSlice.reducer;