import { createRoot } from 'react-dom/client'
import Component from './component/Component'

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(<Component />)
