export default function LoginLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <section className="bg-black/90 overflow-hidden h-screen"> 
        <div className="flex items-center bg-black border-b-2 border-purple-300 pb-4 pl-4 pt-4"> 
          <img src = "img/BeatBuilderLogo.png" width="50" height="50" className=""/>
          <p className="pl-4 text-lg font-semibold"> BeatBuilders</p>
        </div>
        <div className="flex items-center justify-center bg-black/90 pt-20">
            <section className="flex justify-center"> {children} </section>
        </div>
      </section>
        
    );
}