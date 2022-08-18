import { React } from 'react'

export default function VideoReview(props) {
    const { dataVideo, productName } = props;
    return (
        dataVideo.length ?
        <div className="product-detail__video">
            <h3>{productName}</h3>
            <div className="video">
                <ul className="video__list">
                    {dataVideo?.map((videoId, index) => {
                        return (
                            <li className="video__item" key={index}>
                                <div className="video__frame">
                                    <iframe
                                        width="560"
                                        height="315"
                                        src={`https://www.youtube.com/embed/${videoId.video_link}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                                <a target="_blank" href={`https://www.youtube.com/watch?v=${videoId.video_link}`} rel="noreferrer"><span>{videoId.video_text}</span></a>
                            </li>
                        );
                    })}
                </ul>
            </div>
            </div> : ''
    )
}
