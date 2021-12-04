import * as songsService from "../../services/songsService.js";
import * as songsRepository from "../../repositories/songsRepository.js";

const sut = songsService;

describe("Songs Service requesting random song", () => {
  it("returns random song if there is no popular song", async () => {
    jest
      .spyOn(songsRepository, "findRandomSong")
      .mockImplementationOnce(() => ({
        popularSong: [],
        normalSong: [{ name: "normalSong" }],
        randomSong: [{ name: "randomSong" }],
      }));

    const result = await sut.listRandomSong();
    expect(result.name).toEqual("randomSong");
  });

  it("returns random song if there is no normal song", async () => {
    jest
      .spyOn(songsRepository, "findRandomSong")
      .mockImplementationOnce(() => ({
        popularSong: [{ name: "popularSong" }],
        normalSong: [],
        randomSong: [{ name: "randomSong" }],
      }));

    const result = await sut.listRandomSong();
    expect(result.name).toEqual("randomSong");
  });

  it("returns popular song when random number is between 0 and 6(70%)", async () => {
    jest
      .spyOn(songsRepository, "findRandomSong")
      .mockImplementationOnce(() => ({
        popularSong: [{ name: "popularSong" }],
        normalSong: [{ name: "normalSong" }],
        randomSong: [{ name: "randomSong" }],
      }));
    jest.spyOn(Math, "random").mockImplementationOnce(() => 0);

    const result = await sut.listRandomSong();
    expect(result.name).toEqual("popularSong");
  });

  it("returns normal song when random number is between 7 and 9(30%)", async () => {
    jest
      .spyOn(songsRepository, "findRandomSong")
      .mockImplementationOnce(() => ({
        popularSong: [{ name: "popularSong" }],
        normalSong: [{ name: "normalSong" }],
        randomSong: [{ name: "randomSong" }],
      }));
    jest.spyOn(Math, "random").mockImplementationOnce(() => 7);

    const result = await sut.listRandomSong();
    expect(result.name).toEqual("normalSong");
  });
});
