import React from "react";
import { customHistory } from "../../router/router";
import { control } from "../store";
export default class index extends React.Component {
    constructor(props: any) {
        super(props);
        document.title = "Login";
    }
    componentDidMount() {

    }
    render() {
        return (
            <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
                <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
                    <h1 className="font-bold text-center text-2xl mb-5">Login</h1>
                    <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
                        <div className="px-5 py-7">
                            <label className="font-semibold text-sm text-gray-600 pb-1 block">UserName</label>
                            <input autoComplete="false" onKeyDown={(e) => e.key === "Enter" && control.login()} onChange={(e) => {
                                control.store.username = e.target.value;
                            }} type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
                            <label className="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
                            <input autoComplete="false" onKeyDown={(e) => e.key === "Enter" && control.login()} onChange={(e) => { control.store.password = e.target.value }} type="password" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
                            <button onClick={() => control.login()} type="button" className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                                <span className="inline-block mr-2">Login</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}