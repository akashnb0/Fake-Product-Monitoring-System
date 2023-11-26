import React from 'react';
import "./testimonialsItem.scss";

const TestimonialsItem = (props) => {
    const { name, comment, image } = props;
    return (
        <div data-aos="fade-up" className="testimonial-item d-flex flex-column col-12 col-md-4 pb-4">
            <p className="testimonial-comment">"{comment}"</p>
            <div className="testimonial-user">
                <div className="user-image">
                    <img src={image} alt="" />
                </div>
                <h4>{name}</h4>
            </div>
        </div>
    )
}

export default TestimonialsItem