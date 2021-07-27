import React, { useEffect } from 'react';

import { redirect } from '../services/userService'

import { memeSchema } from '../services/schemas'

import Form from '../components/Form'

export default function Stories({ user }) {
  useEffect(() => { redirect(user) }, [user])

<<<<<<< HEAD
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
=======
  return user.loading === undefined &&
    <>
      {user.username}
      {/* <Form name='Login' action={async values => { }} /> */}
    </>
}
>>>>>>> 842fc3afbeedd44dba7667b467f6ff5fa364f901
