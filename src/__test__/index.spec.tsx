import { describe, expect, test } from "vitest";
import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import Page from "../app/page";
import { renderWithProviders } from "./utils/renderWithProviders";
import { setupStore } from "@/lib/store";
import { fetchNewsAsync } from "@/lib/features/news/action";

describe("home page", () => {
    test("component mounted", () => {
        renderWithProviders(<Page />);
        expect(screen.getByRole("main")).toBeDefined();
    });
    test("check store data is ready", async () => {
        const store = setupStore();
        await store.dispatch(fetchNewsAsync({}));
        const { news } = store.getState();
        expect(news.status).toBe("idle");
        expect(news.news.length).not.toBe(0);
    }, 100_000);
});
