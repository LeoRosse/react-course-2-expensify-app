import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Dotenv from 'dotenv';

Enzyme.configure({
    adapter: new Adapter()
});

Dotenv.config({ path: '.env.test' });