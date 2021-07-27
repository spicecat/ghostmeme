
import React, { Component } from "react";

    class Stories extends Component {

      render() {

        return <article className="Post" ref="Post">

            <header>

              <div className="Post-user">

                <div className="Post-user-profilepicture">

                  <img src="https://www.w3schools.com/images/picture.jpg" alt="Me and my Friends" />
                  <p>I went hiking in the mountains!</p>

                </div>

                <div className="Post-user-nickname">

                  <span>John Doe</span>

                </div>

              </div>

            </header>

            <div className="Post-image">

              <div className="Post-image-bg">

                <img alt="Icon Living" src="[https://cdn-images-1.medium.com/max/1200/1*dMSWcBZCuzyRDeMr4uE_og.png]" />

              </div>

            </div>

            <div className="Post-caption">

              <strong>John D. Veloper </strong> Loving Educative!

            </div>

          </article>;

        }

    }

    export default Stories;
