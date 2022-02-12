import { useContext } from 'react';
import { socketContext } from '../context/index.jsx';

const useSocket = () => useContext(socketContext);

export default useSocket;
