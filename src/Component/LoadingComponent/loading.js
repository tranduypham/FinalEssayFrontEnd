import { Loading3QuartersOutlined } from "@ant-design/icons"
import "./loading.css"

const LoadingOverLay = ({ visibility, content }) => {
    if (visibility === true) {
        return (
            <div tabindex="-1" className="ant-modal-wrap" style={{
                backgroundColor: "rgba(0, 0, 0, 0.45)",
                position: 'fixed',
                display: 'flex',
                flexDirection: "column",
                justifyContent: 'center',
                alignItems: 'center',
                height: "100%",
                zIndex: "1000",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                overflow: 'hidden',
            }}>
                <Loading3QuartersOutlined spin style={{
                    fontSize: 150,
                    fontWeight: 600,
                    color: "var(--headerBar)",
                    marginBottom: "100px",
                }} />
                {/* {
                    content ?? */}
                    <div 
                        style={{
                            fontFamily: "cursive",
                            color: "var(--headerBar)",
                            fontSize: 20,
                            fontWeight: 900,
                            lineHeight: 1,
                            textAlign: "center",
                            color: "#fff"
                        }}
                        className="loading-text"
                    >
                        {content}
                    </div>
                {/* } */}
            </div>
        )
    } else {
        return (<></>)
    }
}

export default LoadingOverLay;