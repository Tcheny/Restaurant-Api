import mongoose from 'mongoose'; // DB
import { Router } from 'express'; // definir la route
import Restaurant from '../model/restaurant'; // model
import bodyParser from 'body-parser'; // vérifier l'injection

export default({ config, db }) => {
  let api = Router();

  // 'v1/restaurant' affiche les restaurants
  api.get('/', ( req, res ) => {
    Restaurant.find({}, ( err, restaurants ) => {
      if( err ) {
        res.send( err );
      }
      res.json( restaurants );
    });
  });

  // 'v1/restaurant/:id'  => :id = la variable affiche le restaurant par son id
  api.get('/:id', ( req, res ) => {
    Restaurant.findById(req.params.id, ( err, restaurant ) => {
      if ( err ) {
        res.send( err );
      }
      res.json( restaurant );
    });
  });

  // 'v1/restaurant/add' ajouter un nouveau restaurant
  api.post('/add', ( req, res ) => {
    let newRest = new Restaurant();
    newRest.name = req.body.name;

    newRest.save(( err ) => {
      if ( err ) {
        res.send( err );
      }
      res.json({ message: 'Restaurant saved successfully' });
    });
  });

  // 'v1/restaurant/:id' supprimer un restaurant par son id
  api.delete('/:id', ( req, res ) => {
    Restaurant.remove({
      _id: req.params.id
    }, ( err, restaurant ) => {
      if ( err ) {
        res.send( err )
      }
      res.json({ message: 'Restaurant removed successfully' });
    });
  });

  // 'v1/restaurant/:id' update d'un restaurant par son id
  api.put('/:id', ( req, res ) => {
    Restaurant.findById( req.params.id, ( err, restaurant ) => {
      if ( err ) {
        res.send( err );
      }
      restaurant.name = req.body.name;
      restaurant.save( ( err ) => {
        if ( err ) {
          res.send( err );
        }
        res.json({ message: 'Restaurant infos updated' });
      });
    });
  });

  return api // retourner l'api
};
