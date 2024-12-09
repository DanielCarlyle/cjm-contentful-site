import { getAllPosts,  getAbout } from "@/lib/api";

export default async function AboutPage() {
  const aboutData = await getAbout();

  return (
    <section>
      <h1>{aboutData.title}</h1>
      <img src={aboutData.image.url} alt={aboutData.image.description} />
      <p>{aboutData.description}</p>
      {/* Render Resume */}
      <div>
        <h2>Resume</h2>
        {/* JSON Resume rendering logic */}
      </div>
      {/* Render Accolades */}
      <div>
        <h2>Accolades</h2>
        {aboutData.accoladesCollection.items.map((accolade: any, index: number) => (
          <div key={index}>
            <img src={accolade.url} alt={accolade.description} />
            <p>{accolade.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
