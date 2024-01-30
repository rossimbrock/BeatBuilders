export default function LoginLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className="flex items-center justify-center h-screen bg-black/90">
            <section className="flex justify-center"> {children} </section>
        </div>
        
    );
}