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
        glass: doc.glass.stringValue,
        ingredients: doc.ingredients.arrayValue.values.map((i) => {
          return i.stringValue;
        }),
        measurements: doc.measurements.arrayValue.values.map((m) => {
          return m.stringValue;
        }),
        instructions: doc.instructions.stringValue,
      });
    });

    res.json(drinkArr);
  } catch (error) {
    next(error);
  }
});

router.post("/drinks", async (req, res, next) => {
  try {
    const newDrink = await db.collection("drinks").add(req.body);
    res.json(newDrink);
  } catch (error) {
    next(error);
  }
});

router.delete("/drinks/:id", async (req, res, next) => {
  try {
    await db.collection("drinks").doc(req.params.id).delete();
    res.send("Item removed");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
