
import React, { Component } from "react";

    class Stories extends Component {

      render() {

        return <article className="Post" ref="Post">

            <header>

              <div className="Post-user">

                <div className="Post-user-profilepicture">

                  <img src="https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn.vox-cdn.com%2Fthumbor%2FZHyzDlKiD3Ch1iOL_I9vjeN3Iy0%3D%2F0x0%3A1080x608%2F1200x800%2Ffilters%3Afocal(454x218%3A626x390)%2Fcdn.vox-cdn.com%2Fuploads%2Fchorus_image%2Fimage%2F69357208%2Fbackyardigans.0.jpg&imgrefurl=https%3A%2F%2Fwww.theverge.com%2F2021%2F5%2F28%2F22458399%2Fthe-backyardigans-viral-tiktok-castaways-music-youtube&tbnid=6RCSIQMSK6RShM&vet=12ahUKEwi4m-qHmfrxAhVSYKwKHY30CSsQMygAegUIARDWAQ..i&docid=2aWNPe5Y0phpWM&w=1200&h=800&q=backyardigans&ved=2ahUKEwi4m-qHmfrxAhVSYKwKHY30CSsQMygAegUIARDWAQ" alt="Backyardigans" />

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
