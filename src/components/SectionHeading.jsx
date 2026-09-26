import './section-heading.css';

export default function SectionHeading({as:Tag='h2',title,children,className='',...props}){
  const content=title??children;
  const headingProps={...props};
  delete headingProps.active;
  if(content===undefined||content===null||content==='')return null;
  return <Tag {...headingProps} className={'prism-section-heading '+className}>{content}</Tag>;
}

export function SectionSubtitle({as:Tag='p',className='',children,...props}){
  return <Tag {...props} className={'prism-section-subtitle '+className}>{children}</Tag>;
}

export function SectionHeadingGroup({eyebrow,title,subtitle,as='h2',className=''}){
  return <div className={'prism-heading-group '+className}>
    {title&&eyebrow&&<p className="section-kicker">{eyebrow}</p>}
    <SectionHeading as={as}>{title||eyebrow}</SectionHeading>
    {subtitle&&<SectionSubtitle>{subtitle}</SectionSubtitle>}
  </div>;
}
