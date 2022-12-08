import { useSelector, useDispatch } from 'react-redux';
import {up} from './likeSlice';
import {reset} from './likeSlice';

const Like = ()=> {

    const count = useSelector(state=>state.likes.count);
    const dispatch = useDispatch();
    
    return <div>
        <button className='likeBtn' onClick={()=> {
            dispatch(up())
        }}>좋아요({count})</button>
        <button className='resetBtn' onClick={()=> {
            dispatch(reset())
        }}>리셋({count})</button>
    </div>
}

export default Like;