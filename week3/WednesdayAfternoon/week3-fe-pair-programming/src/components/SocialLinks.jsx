import SocialLink from './SocialLink'
import { socialLinks } from '../data'

const SocialLinks = ({ parentClass, itemClass }) => {
  return (
    <ul className={parentClass}>
      {socialLinks.map((link) => (
        <SocialLink key={link.id} link={link} itemClass={itemClass} />
      ))}
    </ul>
  )
}

export default SocialLinks
