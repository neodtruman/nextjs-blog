import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import vs from 'react-syntax-highlighter/dist/cjs/styles/prism/vs';

import Image from 'next/image';
import { Fragment } from 'react';
import styles from './post-detail.module.css';

export default function PostDetail({ post }) {
  return (
    <Fragment>
      <h1>{post.title}</h1>

      <ReactMarkdown components={{
        p({ node, children }) {
          const firstChild = node.children[0];
          if (firstChild && firstChild.tagName === 'img') {
            return (
              <div className={styles.image}>
                <Image
                  src={`/images/posts/${post.slug}/${firstChild.properties.src}`}
                  alt={firstChild.properties.alt}
                  width={600}
                  height={300}
                />
              </div>
            )
          }
          return <p>{children}</p>;
        },
        code(code) {
          const { className, children } = code;
          const lang = className.replace('language-', '');
          return (
            <SyntaxHighlighter language={lang} showLineNumbers="true" wrapLongLines="true" style={vs} customStyle={{ "overflow": "hidden", "background-color": "#fafafa" }} >
              {children}
            </SyntaxHighlighter>
          )
        }
      }}>{post.content}</ReactMarkdown>
    </Fragment>
  )
}
