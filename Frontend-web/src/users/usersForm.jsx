import React from 'react'
import Grid from '../template/grid'
import IconButton from '../template/iconButton'

export default props => {
    const keyHandler = (e) => {
        if (e.key === 'Enter') {
            e.shiftKey ? props.handleSearch() : props.handleAdd()
        } else if (e.key === 'Escape') {
            props.handleClear()
        }
    }

    return (
        <div role='form' className='usersForm'>
            <Grid cols='12 9 10'>
                <input id='username' className='form-control'
                    placeholder='Cadastre um usuário'
                    onChange={props.handleChangeu}
                    onKeyUp={keyHandler}
                    value={props.username}></input>
                  <input id='password' className='form-control'
                    placeholder='Cadastre uma senha'
                    onChange={props.handleChangep}
                    onKeyUp={keyHandler}
                    value={props.password}></input>
            </Grid>
            <Grid cols='12 3 2'>
                <IconButton style='primary' icon='plus'
                    onClick={props.handleAdd}></IconButton>
                <IconButton style='info' icon='search'
                    onClick={props.handleSearch}></IconButton>
                <IconButton style='default' icon='close'
                    onClick={props.handleClear}></IconButton>
            </Grid>
        </div>
    )
}