import { Request, Response } from "express";

jest.mock("../src/services/lead.service", () => ({
  getLeadWithServices: jest.fn(),
  getAllLeads: jest.fn(),
  createLeadWithServices: jest.fn(),
}));

import { getLeadById, getAllLeads, createLead } from "../src/controllers/lead.controller";
import * as leadService from "../src/services/lead.service";

describe("Lead Controller", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnThis();
    mockRes = { status: statusMock, json: jsonMock };
    jest.clearAllMocks();
  });

  // createLead
  describe("createLead", () => {
    beforeEach(() => {
      mockReq = { body: { name: "New Lead", services: [1, 2] } };
    });

    it("should create a lead and return 201", async () => {
      const fakeLead = { id: 1, name: "New Lead" };
      (leadService.createLeadWithServices as jest.Mock).mockResolvedValue(fakeLead);

      await expect(createLead(mockReq as Request, mockRes as Response)).resolves.toBeUndefined();

      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith(fakeLead);
    });

    it("should return 500 on error", async () => {
      (leadService.createLeadWithServices as jest.Mock).mockRejectedValue(new Error("DB error"));

      await expect(createLead(mockReq as Request, mockRes as Response)).resolves.toBeUndefined();

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ error: "Internal server error" });
    });
  });

  // getAllLeads 
  describe("getAllLeads", () => {
    beforeEach(() => {
      mockReq = {};
    });

    it("should return all leads with 200", async () => {
      const fakeLeads = [{ id: 1, name: "Lead 1" }];
      (leadService.getAllLeads as jest.Mock).mockResolvedValue(fakeLeads);

      await expect(getAllLeads(mockReq as Request, mockRes as Response)).resolves.toBeUndefined();

      expect(jsonMock).toHaveBeenCalledWith(fakeLeads);
      expect(statusMock).not.toHaveBeenCalledWith(500);
    });

    it("should return 500 on error", async () => {
      (leadService.getAllLeads as jest.Mock).mockRejectedValue(new Error("DB error"));

      await expect(getAllLeads(mockReq as Request, mockRes as Response)).resolves.toBeUndefined();

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ error: "Internal server error" });
    });
  });

  // getLeadById
  describe("getLeadById", () => {
    beforeEach(() => {
      mockReq = { params: { id: "1" } };
    });

    it("should return 400 if ID is missing", async () => {
      mockReq.params = {};

      await expect(getLeadById(mockReq as Request, mockRes as Response)).resolves.toBeUndefined();

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ message: "Lead ID is required" });
    });

    it("should return 400 if ID is invalid", async () => {
      mockReq.params = { id: "abc" };

      await expect(getLeadById(mockReq as Request, mockRes as Response)).resolves.toBeUndefined();

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ message: "Invalid lead ID" });
    });

    it("should return 404 if lead not found", async () => {
      (leadService.getLeadWithServices as jest.Mock).mockResolvedValue(null);

      await expect(getLeadById(mockReq as Request, mockRes as Response)).resolves.toBeUndefined();

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({ message: "Lead not found" });
    });

    it("should return 200 and lead data if found", async () => {
      const fakeLead = { id: 1, name: "Test Lead" };
      (leadService.getLeadWithServices as jest.Mock).mockResolvedValue(fakeLead);

      await expect(getLeadById(mockReq as Request, mockRes as Response)).resolves.toBeUndefined();

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(fakeLead);
    });

    it("should return 500 if an error occurs", async () => {
      (leadService.getLeadWithServices as jest.Mock).mockRejectedValue(new Error("DB error"));

      await expect(getLeadById(mockReq as Request, mockRes as Response)).resolves.toBeUndefined();

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ error: "Internal server error" });
    });
  });
});