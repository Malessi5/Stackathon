const router = require("express").Router();

const admin = require("firebase-admin");

const db = admin.firestore();

router.get("/drinks", async (req, res, next) => {
  try {
    const drinks = await db.collection("drinks").get();
    const drinkArr = [];
    drinks.docs.forEach((docitem) => {
      const doc = docitem._fieldsProto;
      drinkArr.push({
        id: docitem.id,
        name: doc.name.stringValue,
        alcoholic: doc.alcoholic.stringValue,
        category: doc.category.stringValue,
        imgUrl: doc.imgUrl.stringValue,
        ingredients: doc.ingredients.arrayValue.values.map((i) => {
          return i.stringValue;
        }),
        measurements: doc.measurements.arrayValue.values.map((m) => {
          return m.stringValue;
        }),
        instructions: doc.instructions.stringValue,
      });
    });

    console.log(drinkArr);
    res.status(200).json(drinkArr);
  } catch (error) {
    next(error);
  }
});

router.post("/drinks", async (req, res, next) => {
  try {
    const newDrink = await db.collection("drinks").add(req.body);
    res.status(200).json(newDrink);
  } catch (error) {
    next(error);
  }
});

router.get("/users/:id/drinks", async (req, res, next) => {
  try {
    const drinks = await db.collection("users").doc(`${req.params.id}`).get();
    res.status(200).json(drinks.data());
  } catch (error) {
    next(error);
  }
});

router.post("/users/:id/drinks", async (req, res, next) => {
  try {
    const update = {drinks: req.body};
    const newDrink = await db
      .collection("users")
      .doc(`${req.params.id}`)
      .update(update);
    res.status(200).json(newDrink);
  } catch (error) {
    next(error);
  }
});

router.post("/users/:id", async (req, res, next) => {
  try {
    const newUser = await db
      .collection("users")
      .doc(`${req.body.uid}`)
      .set(req.body);
    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
});

router.get("/users/:id", async (req, res, next) => {
  try {
    await db
      .collection("users")
      .doc(req.params.id)
      .get()
      .then((userData) => {
        res.status(200).json(userData.exists);
      });
  } catch (error) {
    next(error);
  }
});

router.delete("/drinks/:id", async (req, res, next) => {
  try {
    await db.collection("drinks").doc(req.params.id).delete();
    res.status(200).send("Item removed");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
