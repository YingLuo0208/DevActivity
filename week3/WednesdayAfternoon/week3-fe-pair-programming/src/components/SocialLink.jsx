const SocialLink = ({ link, itemClass }) => {
  return (
    <li key={link.id}>
      <a href={link.href} target="_blank" rel="noreferrer" className={itemClass}>
        <i className={link.iconClass}></i>
      </a>
    </li>
  )
}

export default SocialLink
