import { Request, Response } from 'express';
import { teamService } from '../services/teamService';
import { CreateTeamMemberDTO, UpdateTeamMemberDTO } from '../types/team';

export const getAllTeamMembers = (req: Request, res: Response): void => {
  try {
    const members = teamService.getAll();
    res.status(200).json({
      success: true,
      count: members.length,
      data: members,
    });
  } catch (error) {
    console.error('[teamController.getAllTeamMembers]', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve team members',
    });
  }
};

export const getTeamMemberById = (req: Request, res: Response): void => {
  try {
    const id = String(req.params.id);
    const member = teamService.getById(id);
    if (!member) {
      res.status(404).json({
        success: false,
        error: `Team member with ID '${id}' not found`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: member,
    });
  } catch (error) {
    console.error('[teamController.getTeamMemberById]', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve team member',
    });
  }
};

export const createTeamMember = (req: Request, res: Response): void => {
  try {
    const body: CreateTeamMemberDTO = req.body;

    if (!body.name || !body.name.trim()) {
      res.status(400).json({
        success: false,
        error: 'Validation Error: Full name is required',
      });
      return;
    }

    if (!body.role || !body.role.trim()) {
      res.status(400).json({
        success: false,
        error: 'Validation Error: Role is required',
      });
      return;
    }

    const created = teamService.create(body);
    res.status(201).json({
      success: true,
      message: 'Team member added successfully',
      data: created,
    });
  } catch (error) {
    console.error('[teamController.createTeamMember]', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create team member',
    });
  }
};

export const updateTeamMember = (req: Request, res: Response): void => {
  try {
    const id = String(req.params.id);
    const updates: UpdateTeamMemberDTO = req.body;

    const updated = teamService.update(id, updates);
    if (!updated) {
      res.status(404).json({
        success: false,
        error: `Team member with ID '${id}' not found`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Team member updated successfully',
      data: updated,
    });
  } catch (error) {
    console.error('[teamController.updateTeamMember]', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update team member',
    });
  }
};

export const deleteTeamMember = (req: Request, res: Response): void => {
  try {
    const id = String(req.params.id);
    const deleted = teamService.delete(id);
    if (!deleted) {
      res.status(404).json({
        success: false,
        error: `Team member with ID '${id}' not found`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Team member deleted successfully',
      id,
    });
  } catch (error) {
    console.error('[teamController.deleteTeamMember]', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete team member',
    });
  }
};

export const resetTeamMembers = (req: Request, res: Response): void => {
  try {
    const resetList = teamService.reset();
    res.status(200).json({
      success: true,
      message: 'Team roster reset to default seed',
      count: resetList.length,
      data: resetList,
    });
  } catch (error) {
    console.error('[teamController.resetTeamMembers]', error);
    res.status(500).json({
      success: false,
      error: 'Failed to reset team members',
    });
  }
};
