import { createContext, useContext, useReducer } from 'react'

// store context where our react app state will be stored
const StoreContext = createContext({})

// initial state of useReducer
const initialState = {}

// reducer logic
const reducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN USER':
			return { ...state, user: action.payload }

		case 'LOGOUT USER':
			return { ...state, user: null }
		default:
			return state
	}
}

// custom hook to get the context value
export const useStoreContext = () => {
	return useContext(StoreContext)
}

export const useStore = () => {
	// initialize a useReducer with the store initialState
	// useReducer returns an array [state, dispatch]
	// state is our currentState (its the initialState Object)
	// dispatch is a function that takes an ACTION as a string and
	// mutate the state based on the defined logic we defined before in
	// the reducer variable
	return useReducer(reducer, initialState)
}

// eslint-disable-next-line react/prop-types
export const StoreProvider = ({ children }) => {
	const store = useStore()

	return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}
