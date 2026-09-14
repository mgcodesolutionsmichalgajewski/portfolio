import type {Metadata} from 'next';
import './globals.css';
export const metadata:Metadata={title:'Michał Gajewski | MG Code Solutions',description:'Michał Gajewski — software engineer, Atlassian Forge, React, Node.js i AWS. Poznaj projekty i skontaktuj się z MG Code Solutions.',icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="pl"><body>{children}</body></html>}
