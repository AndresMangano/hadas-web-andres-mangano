import React, { useEffect, useReducer } from 'react';
import './App.scss';
import { Switch, Route } from 'react-router-dom';
import { HomeView } from './views/HomeView';
import { ClassesView } from './views/ClassesView';
import { CoachesView } from './views/CoachesView';
import { StudentsView } from './views/StudentsView';
import { RoomsView } from './views/RoomsView';
import { ShowsView } from './views/ShowsView';
import { ContactView } from './views/ContactView';
import { useFirebase } from './services/firebase.service';
import { AppLoading } from './controls/AppLoading';
import { CoachView } from './views/CoachView';
import { ClassView } from './views/ClassView';
import { AdministrationView } from './views/AdministrationView';
import { reducer } from './state/app.reducer';
import { AppFixed } from './controls/AppFixed';
import { AppButton } from './controls/AppButton';
import { PhotosViews } from './views/PhotosView';
import ReactPixel from 'react-facebook-pixel';

export function App() {
    const firebaseService = useFirebase();
    const [state, dispatch] = useReducer(reducer, {
        admin: false,
        newResources: [],
        data: undefined
    });

    useEffect(() => {
        firebaseService.load((data) => dispatch({ _type: 'DATA_LOADED', data }));
        ReactPixel.init('382929239692599', undefined, {
            autoConfig: true,
            debug: false
        });
    }, [firebaseService]);

    function handlerPublish() {
        if (window.confirm("Confirme que desea publicar los cambios")) {
            firebaseService.publish(state)
                .then(() => alert("Los cambios fueron publicados"))
                .catch(() => alert("Error al publicar los cambios"));
        }
    }

    return (
        <div>
            { (state.data !== undefined)
                ?   <Switch>
                        <Route exact path="/" render={route => <HomeView {...route} state={state.data!} />}/>
                        <Route exact path='/clases' render={route => <ClassesView {...route} state={state.data!} />}/>
                        <Route path='/clases/:group/:class' render={route => <ClassView {...route} state={state.data!} />}/>
                        <Route exact path='/profes' render={route => <CoachesView {...route} state={state.data!} />}/>
                        <Route path='/profes/:coach' render={route => <CoachView {...route} state={state.data!} />}/>
                        <Route path='/testimoniales' render={route => <StudentsView {...route} state={state.data!} />}/>
                        <Route path='/salas' render={route => <RoomsView {...route} state={state.data!} />}/>
                        <Route path='/fotos' render={route => <PhotosViews {...route} state={state.data!} />} />
                        <Route path='/shows' render={route => <ShowsView {...route} state={state.data!} />}/>
                        <Route path='/inscripcion' render={route => <ContactView {...route} state={state.data!} />}/>
                        <Route path='/admin/:section?' render={route => <AdministrationView admin={state.admin} {...route} state={state.data!} dispatch={dispatch} />}/>
                    </Switch>
                :   <AppLoading>Cargando...</AppLoading>
            }
            {
                state.admin &&
                    <AppFixed top='5vh' right='5vw'>
                        <AppButton onClick={handlerPublish}>Publicar</AppButton>
                    </AppFixed>
            }
        </div>
    );
}