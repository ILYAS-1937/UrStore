import useStore from "../../useStore";

function FinalPreview() {
     const data = useStore((state) => state.data);
    return (
        <div>
            <h1>{data.headerBorderColor}</h1>  
            <p>{data.headerBgColor}</p>
            <p>{data.headerLogoWidth}</p>
            <img src={data.headerLogo} alt="Store Logo" />
            <img src={data.currentImage} alt="" />
            <h1>{data.heroTitle}</h1>
            <p>{data.heroSubtitle}</p>
            <p>{data.heroTitleColor}</p>
        </div>
    );
}
export default FinalPreview;