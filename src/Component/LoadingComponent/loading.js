import { Loading3QuartersOutlined } from "@ant-design/icons"

const LoadingOverLay = ({ visibility }) => {
    if (visibility === true) {
        return (
            <div tabindex="-1" className="ant-modal-wrap" style={{
                backgroundColor: "rgba(0, 0, 0, 0.45)",
                position: 'fixed',
                display: 'flex',
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
                    marginBottom: "400px",
                }} />
            </div>
        )
    } else {
        return (<></>)
    }
}

export default LoadingOverLay;