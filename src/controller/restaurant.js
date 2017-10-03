import mongoose from 'mongoose'; // DB
import { Router } from 'express'; // definir la route
import Restaurant from '../model/restaurant'; // model
import bodyParser from 'body-parser'; // vérifier l'injection

export default({ config, db }) => {
  let api = Router();

  // 'v1/restaurant'
  api.get('/', ( req, res ) => {
    Restaurant.find({}, ( err, restaurants ) => {
        if( err ) {
          res.send( err );
        }
        res.json( restaurants );
    });
  });

  // 'v1/restaurant/add'
  api.post('/add', ( req, res ) => {
    let newRest = new Restaurant();
    newRest.name = req.body.name;

    newRest.save(( err ) => {
      if ( err ) {
        res.send( err );
      }
      res.json({ message: 'Restaurant saved successfully'});
    });
  });
  return api
};
