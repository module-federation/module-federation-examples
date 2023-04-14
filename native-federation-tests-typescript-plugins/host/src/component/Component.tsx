import { AnotherButton } from 'moduleFederationTypescript/anotherButton'
import Button from 'moduleFederationTypescript/button'

const Component = () => <div>
    <Button onClick={console.log} />
    <AnotherButton onClick={console.error} />
</div>

export default Component