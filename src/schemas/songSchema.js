import joi from "joi";

const songSchema = joi.object({
  name: joi.string().required(),
  youtubeLink: joi
    .string()
    .regex(
      new RegExp(
        /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/
      )
    )
    .required(),
});

export { songSchema };
