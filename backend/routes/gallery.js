import express from "express";
import Gallery from "../models/Gallery.js";

const router = express.Router();

router.post("/createGallery", async (req, res) => {
  try {
    const newGallery = new Gallery({
      org_id: req.body.org_id,
      images: req.body.images,
    });
    const savedGallery = await newGallery.save();
    res.status(200).json(savedGallery);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/updateGallery", async (req, res) => {
  try {
    const old_gallery = await Gallery.findOne({
      org_id: req.body.org_id,
    });
    if (!old_gallery) {
      const newGallery = new Gallery({
        org_id: req.body.org_id,
        images: req.body.images,
      });
      const savedGallery = await newGallery.save();
      res.status(200).json(savedGallery);
      return;
    } else {
      const updatedGallery = await Gallery.findOneAndUpdate(
        {
          org_id: req.body.org_id,
        },
        {
          $set: {
            images: req.body.images,
          },
        }
      );
      res.status(200).json(updatedGallery);
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/getGallery", async (req, res) => {
  try {
    const gallery = await Gallery.findOne({
      org_id: req.body.org_id,
    });
    res.status(200).json(gallery);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/removeImage", async (req, res) => {
  try {
    const gallery = await Gallery.findOne({
      org_id: req.body.org_id,
    });
    const new_images = gallery.images.filter(
      (image) => image !== req.body.image
    );
    const updatedGallery = await Gallery.findOneAndUpdate(
      {
        org_id: req.body.org_id,
      },
      {
        $set: {
          images: new_images,
        },
      }
    );
    res.status(200).json(updatedGallery);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

export default router;
