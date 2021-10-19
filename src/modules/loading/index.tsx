import { observable } from "mobx";
import { observer } from "mobx-react";
import React from "react";

@observer
export default class index extends React.Component {
    render() {
        if (loadingStore.loading) {
            return (
                <div style={{ position: "fixed", top: 10, right: 20, }}>
                    <div className=" flex justify-center items-center">
                        <div style={{ height: "50px", width: "50px" }} className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
                    </div>
                </div>
            )
        }
        else return null;


    }
}
class Loading {
    @observable loading: boolean = false;
}
export const loadingStore = new Loading();