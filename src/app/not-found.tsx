"use client";
import Link from "next/link";
import Layout from "@/components/layout/Layout";

export default function NotFound() {
  return (
    <Layout>
      <>
        <style>{`
          .page_404 {
            padding: 40px 0;
            background: #fff;
            font-family: Georgia, 'Times New Roman', serif;
          }
          .page_404 img { width: 100%; }

          .four_zero_four_bg {
            background-image: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif);
            height: 400px;
            background-position: center;
            background-repeat: no-repeat;
            background-size: contain;
          }
          .four_zero_four_bg h1 {
            font-size: 80px;
            font-family: 'Arvo', serif;
          }
          .four_zero_four_bg h3 {
            font-size: 80px;
          }
          .link_404 {
            color: #fff !important;
            padding: 10px 20px;
            background: #39ac31;
            margin: 20px 0;
            display: inline-block;
            text-decoration: none;
            font-family: 'Arvo', serif;
          }
          .link_404:hover {
            background: #2d8f27;
          }
          .contant_box_404 {
            margin-top: -50px;
            font-family: 'Arvo', serif;
          }
          .contant_box_404 h3 {
            font-size: 28px;
            font-family: 'Arvo', serif;
          }
          .contant_box_404 p {
            font-family: 'Arvo', serif;
          }
        `}</style>

        <section className="page_404">
          <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 15px' }}>
            <div className="row">
              <div className="col-sm-12">
                <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>

                  <div className="four_zero_four_bg">
                    <h1 className="text-center">404</h1>
                  </div>

                  <div className="contant_box_404">
                    <h3 className="h2">
                      Look like you're lost
                    </h3>
                    <p>the page you are looking for not avaible!</p>
                    <Link href="/" className="link_404">Go to Home</Link>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    </Layout>
  );
}
