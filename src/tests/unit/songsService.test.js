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

describe("Songs Service voting on a song", () => {
  it("change score of a song to +1 when type = upvote", async () => {
    jest
      .spyOn(songsRepository, "findSong")
      .mockImplementationOnce(() => ({ score: 1 }));
    jest
      .spyOn(songsRepository, "updateSongScore")
      .mockImplementationOnce(() => ({ score: 2 }));

    await sut.voteSong(1, "upvote");

    expect(songsRepository.updateSongScore).toHaveBeenCalledWith(1, 2);
  });

  it("change score of a song to -1 when type = downvote", async () => {
    jest
      .spyOn(songsRepository, "findSong")
      .mockImplementationOnce(() => ({ score: 1 }));
    jest
      .spyOn(songsRepository, "updateSongScore")
      .mockImplementationOnce(() => ({ score: 0 }));

    await sut.voteSong(1, "downvote");

    expect(songsRepository.updateSongScore).toHaveBeenCalledWith(1, 0);
  });

  it("delete song if type = downvote and score = -5", async () => {
    jest
      .spyOn(songsRepository, "findSong")
      .mockImplementationOnce(() => ({ score: -5 }));
    jest
      .spyOn(songsRepository, "deleteSong")
      .mockImplementationOnce(() => null);

    await sut.voteSong(1, "downvote");

    expect(songsRepository.deleteSong).toHaveBeenCalledWith(1);
  });
});
