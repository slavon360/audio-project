import AddAudio from '../components/AddAudio';
import AudioList from '../components/AudioList';

const routes = [
    {
        path: '/',
        exact: true,
        component: AudioList
    },
    {
        path: '/add-audio',
        exact: true,
        component: AddAudio
    }
];

export default routes;