import { useState } from "react";
import PinRequiredModal from "./PinRequiredModal";


const VerifyUser = () => {
    const [visibility, setVisibility] = useState(true);
    return(
        <PinRequiredModal 
            visible={visibility}
            hidden={()=>setVisibility(false)}
        />
    )
}
export default VerifyUser